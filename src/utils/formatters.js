/**
 * Format an Indian phone number cleanly for tel: protocol.
 */
export function formatPhoneForTel(phoneStr) {
  if (!phoneStr) return '';
  return phoneStr.replace(/[^\d+]/g, '');
}

/**
 * Generate a WhatsApp click-to-chat URL with prefilled URL-encoded message.
 */
export function createWhatsAppUrl(phone, defaultMessage) {
  const cleanNumber = phone.replace(/[^\d]/g, '');
  const encodedText = encodeURIComponent(defaultMessage);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Truncate long strings with ellipsis.
 */
export function truncateText(str, maxLength = 120) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '…';
}
