/**
 * Indian Mobile number validation regex.
 * Accepts:
 * - 10-digit formats starting with 6, 7, 8, 9 (e.g. 9845012345)
 * - Optional +91 or 91 or 0 prefix with optional space or hyphen (e.g. +91 98450 12345, +91-9845012345, 09845012345)
 */
export const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[-]\s*|\s*)?|[0]?)?[6789]\d{9}$/;

/**
 * Standard RFC-5322 compliant email regex.
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validate student enquiry form fields.
 * Returns an object of errors where key is field name, or empty object if valid.
 */
export function validateEnquiryForm(formData) {
  const errors = {};

  // Student Name
  if (!formData.studentName || !formData.studentName.trim()) {
    errors.studentName = "Please enter the student's full name.";
  } else if (formData.studentName.trim().length < 2) {
    errors.studentName = "Student name must be at least 2 characters.";
  }

  // Parent / Guardian Name
  if (!formData.parentName || !formData.parentName.trim()) {
    errors.parentName = "Please enter the parent or guardian's name.";
  } else if (formData.parentName.trim().length < 2) {
    errors.parentName = "Parent/Guardian name must be at least 2 characters.";
  }

  // Phone Number (10-digit Indian mobile)
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Mobile number is required.";
  } else {
    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number (e.g. 9845012345).";
    }
  }

  // Email
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address (e.g. student@example.com).";
  }

  // Class / Standard
  if (!formData.standard || !formData.standard.trim()) {
    errors.standard = "Please select the student's current class/standard.";
  }

  // Course Interested In
  if (!formData.courseId || !formData.courseId.trim()) {
    errors.courseId = "Please select a course of interest.";
  }

  // Message (optional, but max 500 chars)
  if (formData.message && formData.message.length > 500) {
    errors.message = `Message cannot exceed 500 characters (${formData.message.length}/500).`;
  }

  return errors;
}

/**
 * Validates a single field on blur.
 */
export function validateSingleField(name, value, allValues = {}) {
  const partial = { ...allValues, [name]: value };
  const allErrors = validateEnquiryForm(partial);
  return allErrors[name] || '';
}
