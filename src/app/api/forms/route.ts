import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { verifyRecaptcha } from '@/shared/lib/recaptcha';

const ENABLE_RECAPTCHA = true;

type RequestPayload = {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  message: string;
};

type BriefPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType?: string;
  projectSchedule?: string;
  stylePreferences?: string;
  projectNotes?: string;
};

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  budgetRange?: string;
  stylePreference?: string;
  constructionTimeline?: string;
  siteStatus?: string;
  professionalStatus?: string;
  buildLocation?: string;
  additionalNotes?: string;
};

type QuotePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designPreferences?: string;
  additionalInformation?: string;
  preferredContact?: string;
  projectType?: string[];
  refinementsHome?: string[];
  refinementsGarage?: string[];
  refinementsGazebo?: string[];
  additionalComments?: string;
  preferredStartDate?: string;
  hasTimeline?: string;
  timelineFileName?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      formType: 'request' | 'brief' | 'contact' | 'quote';
      data: (RequestPayload | BriefPayload | ContactPayload | QuotePayload) & {
        recaptcha?: string;
      };
    };

    const { formType } = body;
    const rawData = body.data as (
      | RequestPayload
      | BriefPayload
      | ContactPayload
      | QuotePayload
    ) & {
      recaptcha?: string;
    };

    const recaptcha = rawData.recaptcha;

    if (formType === 'request' && ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json(
          { message: 'reCAPTCHA verification is required.' },
          { status: 400 }
        );
      }
      const isValid = await verifyRecaptcha(recaptcha);
      if (!isValid) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    const { recaptcha: _recaptcha, ...data } = rawData as Record<string, unknown> & {
      recaptcha?: string;
    };
    void _recaptcha;

    const apiKey = process.env.SENDGRID_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error('SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set');
      return NextResponse.json({ message: 'Email configuration is missing.' }, { status: 500 });
    }

    sgMail.setApiKey(apiKey);

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string | undefined | null) => {
      if (text == null) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    let subject: string;
    let html: string;
    let userEmail: string | undefined;

    if (formType === 'request') {
      const d = data as RequestPayload;
      console.log(d);
      userEmail = d.email;
      subject = 'Request';
      html = `
        <h2>Request</h2>
        <p><strong>Service:</strong> ${escapeHtml(d.service)}</p>
        <p><strong>Company name:</strong> ${escapeHtml(d.companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(d.website)}</p>
        <p><strong>Message:</strong> ${escapeHtml(d.message)}</p>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      `;

      const msg = {
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      };

      const safeFirstName = escapeHtml(d.fullName.split(' ')[0] || d.fullName);

      const userMsg = {
        to: d.email,
        from: fromEmail,
        subject: "We've Received Your Request",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Received - Doméra</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Cabinet Grotesk', Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #fbfaf9; color: #000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fbfaf9;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #fbfaf9; overflow: hidden;">
          <tr>
            <td style="padding: 0; line-height: 0;">
              <img style="display: block; width: 100%; height: auto;" src="https://xn--domra-dsa.com/images/email-header.png" alt="Doméra">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background: #fbfaf9;">
              <h1 style="margin: 0 0 32px; color: #000; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-style: normal; font-weight: 700; line-height: 44px; letter-spacing: -1px;">
                Hello ${safeFirstName},
              </h1>
              <p style="margin: 0 0 32px; color: #000; font-size: 18px; font-style: normal; font-weight: 400; line-height: 28px;">
                Thank you for contacting Doméra! We&rsquo;ve received your inquiry and are currently reviewing your request.<br><br>
                Our team will get back to you shortly with the information you need. If you have additional questions or require immediate assistance, feel free to reach out to us at <a href="mailto:info@doméra.com" style="color: #463c26; text-decoration: none;">info@doméra.com</a>.
              </p>
              <p style="margin: 0; color: #000; font-size: 18px; font-style: normal; font-weight: 700; line-height: 28px;">
                Best regards,<br>
                The Doméra Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0; line-height: 0;">
              <img style="display: block; width: 100%; height: auto;" src="https://xn--domra-dsa.com/images/email-footer.png" alt="Doméra">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      };

      await sgMail.send(msg);
      try {
        await sgMail.send(userMsg);
        console.log(`Request confirmation email sent to ${userEmail}`);
      } catch (userErr) {
        console.error(
          'Failed to send user confirmation email:',
          (userErr as { response?: { body?: unknown } })?.response?.body ?? userErr,
        );
      }
    } else if (formType === 'brief') {
      const d = data as unknown as BriefPayload;
      userEmail = d.email;
      subject = 'Structure Your Idea — New Brief';
      html = `
        <h2>Structure Your Idea — New Brief</h2>
        <p><strong>First name:</strong> ${escapeHtml(d.firstName)}</p>
        <p><strong>Last name:</strong> ${escapeHtml(d.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(d.projectType)}</p>
        <p><strong>Project schedule:</strong> ${escapeHtml(d.projectSchedule)}</p>
        <p><strong>Style preferences:</strong> ${escapeHtml(d.stylePreferences)}</p>
        <p><strong>Project notes:</strong> ${escapeHtml(d.projectNotes)}</p>
      `;

      await sgMail.send({
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      });

      console.log(`Brief submission received from ${userEmail}`);
    } else if (formType === 'contact') {
      const d = data as unknown as ContactPayload;
      userEmail = d.email;
      subject = 'Contact Doméra — New Inquiry';
      html = `
        <h2>Contact Doméra — New Inquiry</h2>
        <p><strong>First name:</strong> ${escapeHtml(d.firstName)}</p>
        <p><strong>Last name:</strong> ${escapeHtml(d.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Estimated budget range:</strong> ${escapeHtml(d.budgetRange)}</p>
        <p><strong>Style preference:</strong> ${escapeHtml(d.stylePreference)}</p>
        <p><strong>Expected construction timeline:</strong> ${escapeHtml(d.constructionTimeline)}</p>
        <p><strong>Site status:</strong> ${escapeHtml(d.siteStatus)}</p>
        <p><strong>Professional status:</strong> ${escapeHtml(d.professionalStatus)}</p>
        <p><strong>Intended build location:</strong> ${escapeHtml(d.buildLocation)}</p>
        <p><strong>Additional notes:</strong> ${escapeHtml(d.additionalNotes)}</p>
      `;

      await sgMail.send({
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      });

      console.log(`Contact inquiry received from ${userEmail}`);
    } else if (formType === 'quote') {
      const d = data as unknown as QuotePayload;
      userEmail = d.email;
      subject = 'Custom Quote Request — New Planning Inquiry';
      const projectTypes = Array.isArray(d.projectType) ? d.projectType : [];
      const refinementGroups: { label: string; items?: string[] }[] = [
        { label: 'Residential refinements', items: d.refinementsHome },
        { label: 'Garage refinements', items: d.refinementsGarage },
        { label: 'Gazebo refinements', items: d.refinementsGazebo },
      ];
      const refinementsHtml = refinementGroups
        .filter((g) => Array.isArray(g.items) && g.items.length > 0)
        .map(
          (g) =>
            `<p><strong>${g.label}:</strong></p><ul>${(g.items ?? [])
              .map((r) => `<li>${escapeHtml(r)}</li>`)
              .join('')}</ul>`,
        )
        .join('');
      html = `
        <h2>Custom Quote Request — New Planning Inquiry</h2>
        <p><strong>First name:</strong> ${escapeHtml(d.firstName)}</p>
        <p><strong>Last name:</strong> ${escapeHtml(d.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Design preferences:</strong> ${escapeHtml(d.designPreferences)}</p>
        <p><strong>Additional information:</strong> ${escapeHtml(d.additionalInformation)}</p>
        <p><strong>Preferred method of contact:</strong> ${escapeHtml(d.preferredContact)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectTypes.join(', '))}</p>
        ${refinementsHtml}
        <p><strong>Additional comments:</strong> ${escapeHtml(d.additionalComments)}</p>
        <p><strong>Preferred project start date:</strong> ${escapeHtml(d.preferredStartDate)}</p>
        <p><strong>Has timeline in mind:</strong> ${escapeHtml(d.hasTimeline)}</p>
        <p><strong>Uploaded timeline file:</strong> ${escapeHtml(d.timelineFileName)}</p>
      `;

      await sgMail.send({
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      });

      const safeFirstName = escapeHtml(d.firstName);

      const userMsg = {
        to: d.email,
        from: fromEmail,
        subject: "We've Received Your Request",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Received - Doméra</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Cabinet Grotesk', Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #fbfaf9; color: #000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fbfaf9;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #fbfaf9; overflow: hidden;">
          <tr>
            <td style="padding: 0; line-height: 0;">
              <img style="display: block; width: 100%; height: auto;" src="https://xn--domra-dsa.com/images/email-header.png" alt="Doméra">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background: #fbfaf9;">
              <h1 style="margin: 0 0 32px; color: #000; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-style: normal; font-weight: 700; line-height: 44px; letter-spacing: -1px;">
                Hello ${safeFirstName},
              </h1>
              <p style="margin: 0 0 32px; color: #000; font-size: 18px; font-style: normal; font-weight: 400; line-height: 28px;">
                Thank you for contacting Doméra! We&rsquo;ve received your inquiry and are currently reviewing your request.<br><br>
                Our team will get back to you shortly with the information you need. If you have additional questions or require immediate assistance, feel free to reach out to us at <a href="mailto:info@doméra.com" style="color: #463c26; text-decoration: none;">info@doméra.com</a>.
              </p>
              <p style="margin: 0; color: #000; font-size: 18px; font-style: normal; font-weight: 700; line-height: 28px;">
                Best regards,<br>
                The Doméra Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0; line-height: 0;">
              <img style="display: block; width: 100%; height: auto;" src="https://xn--domra-dsa.com/images/email-footer.png" alt="Doméra">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      };

      try {
        await sgMail.send(userMsg);
        console.log(`Quote confirmation email sent to ${userEmail}`);
      } catch (userErr) {
        console.error(
          'Failed to send user confirmation email:',
          (userErr as { response?: { body?: unknown } })?.response?.body ?? userErr,
        );
      }

      console.log(`Quote request received from ${userEmail}`);
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ message: 'Failed to submit request' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Request submitted successfully' }, { status: 200 });
}
