/**
 * @typedef {Object} EnquiryPayload
 * @property {string} studentName
 * @property {string} parentName
 * @property {string} phone
 * @property {string} email
 * @property {string} standard
 * @property {string} courseId
 * @property {string} courseName
 * @property {string} [message]
 */

/**
 * Admission & Enquiry Service Layer
 * Simulates real API endpoint submissions.
 */
export const enquiryService = {
  /**
   * Submit admission enquiry form.
   * @param {EnquiryPayload} payload
   * @returns {Promise<{ success: boolean, referenceId: string, message: string, timestamp: string }>}
   */
  async submit(payload) {
    // Simulate real network trip with potential jitter
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic payload sanity check
    if (!payload.studentName || !payload.phone || !payload.email || !payload.standard) {
      throw new Error("Missing required enquiry fields.");
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `SMA-${new Date().getFullYear()}-${randomSuffix}`;

    return {
      success: true,
      referenceId,
      message: `Enquiry successfully registered for ${payload.studentName}. Our academic counsellor will reach out within 24 working hours.`,
      timestamp: new Date().toISOString()
    };
  }
};
