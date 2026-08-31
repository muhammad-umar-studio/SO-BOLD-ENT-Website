'use server';

export interface ActionState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function submitContactInquiry(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const inquiryType = formData.get('inquiry') as string;
  const message = formData.get('message') as string;

  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Please provide a valid moniker or entity name.';
  }

  if (!email || !email.includes('@')) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'Please provide a brief description (min 10 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Validation failed. Please correct highlighted errors.',
      errors,
    };
  }

  // Simulate storing inquiry or sending notification
  console.log('Received inquiry:', { name, email, inquiryType, message });

  return {
    success: true,
    message: 'Your inquiry has been logged with executive management. We will contact you shortly.',
  };
}
