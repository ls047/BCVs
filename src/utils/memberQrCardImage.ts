import QRCode from 'qrcode';
import type { TeamMember } from '../data/team';

const CARD_WIDTH = 640;
const PADDING = 36;
const TEXT_MAX = CARD_WIDTH - PADDING * 2;
const QR_SIZE = 248;
const DPR = 2;

const COLORS = {
  name: '#0d0d0d',
  role: '#525252',
  bio: '#404040',
  footer: '#737373',
  border: '#e5e5e5',
  bg: '#ffffff',
};

const NAME_LINE = 34;
const ROLE_LINE = 24;
const BIO_LINE = 22;
const GAP_NAME_TO_ROLE = 10;
const GAP_ROLE_TO_BIO = 14;
const GAP_NAME_TO_BIO = 12;
const GAP_TEXT_TO_QR = 28;
const FOOTER_H = 20;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('QR image failed to load'));
    img.src = src;
  });
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.trim().split(/\n/);
  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
  }
  return lines.length ? lines : [''];
}

function measureCardHeight(
  nameLines: string[],
  roleLines: string[],
  bioLines: string[],
): number {
  let h = PADDING;
  h += nameLines.length * NAME_LINE;
  if (roleLines.length) {
    h += GAP_NAME_TO_ROLE + roleLines.length * ROLE_LINE;
  }
  if (bioLines.length) {
    h += (roleLines.length ? GAP_ROLE_TO_BIO : GAP_NAME_TO_BIO) + bioLines.length * BIO_LINE;
  }
  h += GAP_TEXT_TO_QR + QR_SIZE + 14 + FOOTER_H + PADDING;
  return h;
}

/**
 * PNG data URL: member summary + QR linking to their CV page.
 */
export async function buildMemberQrCardPng(member: TeamMember, pageUrl: string): Promise<string> {
  const qrDataUrl = await QRCode.toDataURL(pageUrl, {
    width: QR_SIZE,
    margin: 1,
    color: { dark: '#0d0d0d', light: '#ffffff' },
  });
  const qrImg = await loadImage(qrDataUrl);

  const measureCtx = document.createElement('canvas').getContext('2d');
  if (!measureCtx) throw new Error('Canvas not supported');

  measureCtx.font = '600 26px system-ui, "Segoe UI", Roboto, sans-serif';
  const nameLines = wrapLines(measureCtx, member.name, TEXT_MAX).slice(0, 3);

  let roleLines: string[] = [];
  if (member.role?.trim()) {
    measureCtx.font = '500 17px system-ui, "Segoe UI", Roboto, sans-serif';
    roleLines = wrapLines(measureCtx, member.role.trim(), TEXT_MAX).slice(0, 2);
  }

  let bioLines: string[] = [];
  if (member.bio?.trim()) {
    measureCtx.font = '400 15px system-ui, "Segoe UI", Roboto, sans-serif';
    bioLines = wrapLines(measureCtx, member.bio.trim(), TEXT_MAX).slice(0, 12);
  }

  const height = measureCardHeight(nameLines, roleLines, bioLines);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  canvas.width = CARD_WIDTH * DPR;
  canvas.height = height * DPR;
  ctx.scale(DPR, DPR);

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, CARD_WIDTH, height);
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, CARD_WIDTH - 1, height - 1);

  let y = PADDING;

  ctx.font = '600 26px system-ui, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = COLORS.name;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (const line of nameLines) {
    ctx.fillText(line, PADDING, y);
    y += NAME_LINE;
  }

  if (roleLines.length) {
    y += GAP_NAME_TO_ROLE;
    ctx.font = '500 17px system-ui, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = COLORS.role;
    for (const line of roleLines) {
      ctx.fillText(line, PADDING, y);
      y += ROLE_LINE;
    }
  }

  if (bioLines.length) {
    y += roleLines.length ? GAP_ROLE_TO_BIO : GAP_NAME_TO_BIO;
    ctx.font = '400 15px system-ui, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = COLORS.bio;
    for (const line of bioLines) {
      ctx.fillText(line, PADDING, y);
      y += BIO_LINE;
    }
  }

  y += GAP_TEXT_TO_QR;
  const qrX = (CARD_WIDTH - QR_SIZE) / 2;
  ctx.drawImage(qrImg, qrX, y, QR_SIZE, QR_SIZE);
  y += QR_SIZE + 14;

  ctx.font = '400 12px system-ui, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = COLORS.footer;
  ctx.textAlign = 'center';
  ctx.fillText('Scan to open CV page', CARD_WIDTH / 2, y);

  return canvas.toDataURL('image/png');
}
