<?php
// Set headers for CORS and JSON response
header('Content-Type: application/json; charset=utf-8');

// If it's an OPTIONS request, return 200 (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Load Composer's autoloader (assumes vendor directory is in the same directory as this script on Hostinger)
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    error_log("PHPMailer autoloader not found at: " . $autoloadPath);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error.']);
    exit;
}
require $autoloadPath;

// Load SMTP configuration
// It is recommended to place smtp-config.php outside the public_html directory for security.
// For this script, we assume it's one directory above the web root, or fallback to the same directory.
$configPath = __DIR__ . '/smtp-config.php';
if (file_exists(__DIR__ . '/../smtp-config.php')) {
    $configPath = __DIR__ . '/../smtp-config.php';
}

if (!file_exists($configPath)) {
    error_log("SMTP configuration file not found.");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error.']);
    exit;
}
$smtpConfig = require $configPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Read the JSON payload from the request body
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Fallback to $_POST if the content type wasn't application/json
if (!$input) {
    $input = $_POST;
}

// Check honeypot field
if (!empty($input['botcheck']) || !empty($input['website_url'])) {
    // Honeypot triggered, silently reject
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Request sent successfully.']);
    exit;
}

// Helper to sanitize input
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Extract and sanitize fields
$fullName = isset($input['fullName']) ? sanitize($input['fullName']) : '';
$companyName = isset($input['companyName']) ? sanitize($input['companyName']) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($input['phone']) ? sanitize($input['phone']) : '';
$requirement = isset($input['productRequirement']) ? sanitize($input['productRequirement']) : '';
$quantity = isset($input['quantity']) && trim($input['quantity']) !== '' ? sanitize($input['quantity']) : 'Not specified';
$message = isset($input['message']) && trim($input['message']) !== '' ? sanitize($input['message']) : 'Not provided';

// Validation
if (empty($fullName) || empty($companyName) || empty($email) || empty($phone) || empty($requirement)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled out.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

// Prepare PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = 0; // Disable verbose debug output in production
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'admin@yuvab2bsupplies.com';
    $mail->Password   = $smtpConfig['password']; // Loaded from secure config
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Recipients
    $mail->setFrom('admin@yuvab2bsupplies.com', 'YUVA B2B SUPPLIES');
    
    // Prevent header injection in Reply-To
    $safeEmail = str_replace(array("\r", "\n"), '', $email);
    $safeName = str_replace(array("\r", "\n"), '', $fullName);
    $mail->addReplyTo($safeEmail, $safeName);
    
    $mail->addAddress('admin@yuvab2bsupplies.com', 'Admin');

    // Subject
    $mail->Subject = 'New B2B Enquiry — YUVA B2B SUPPLIES';

    // Plain text body
    $plainText = "YUVA B2B SUPPLIES\n";
    $plainText .= "NEW WEBSITE ENQUIRY\n";
    $plainText .= "==============================\n\n";
    $plainText .= "CUSTOMER DETAILS\n";
    $plainText .= "------------------------------\n";
    $plainText .= "Full Name:\n{$fullName}\n\n";
    $plainText .= "Company Name:\n{$companyName}\n\n";
    $plainText .= "Email Address:\n{$email}\n\n";
    $plainText .= "Phone Number:\n{$phone}\n\n\n";
    $plainText .= "REQUIREMENT\n";
    $plainText .= "------------------------------\n";
    $plainText .= "Product / Requirement:\n{$requirement}\n\n";
    $plainText .= "Quantity / Approx. Requirement:\n{$quantity}\n\n";
    $plainText .= "Message:\n{$message}\n\n\n";
    $plainText .= "SOURCE\n";
    $plainText .= "------------------------------\n";
    $plainText .= "YUVA B2B SUPPLIES Website\n";

    // HTML body
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; }
            .header { background-color: #1E3A8A; color: #ffffff; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; }
            .header p { margin: 5px 0 0 0; font-size: 14px; color: #BFDBFE; }
            .section { padding: 20px; border-bottom: 1px solid #E2E8F0; }
            .section-title { font-size: 16px; font-weight: bold; color: #1E40AF; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
            .field { margin-bottom: 15px; }
            .label { font-size: 13px; color: #64748B; text-transform: uppercase; margin-bottom: 4px; display: block; }
            .value { font-size: 15px; color: #0F172A; font-weight: 500; white-space: pre-wrap; }
            .footer { background-color: #F1F5F9; padding: 15px 20px; text-align: center; font-size: 13px; color: #64748B; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>YUVA B2B SUPPLIES</h1>
                <p>NEW WEBSITE ENQUIRY</p>
            </div>
            
            <div class='section'>
                <h2 class='section-title'>Customer Details</h2>
                <div class='field'>
                    <span class='label'>Full Name</span>
                    <span class='value'>{$fullName}</span>
                </div>
                <div class='field'>
                    <span class='label'>Company Name</span>
                    <span class='value'>{$companyName}</span>
                </div>
                <div class='field'>
                    <span class='label'>Email Address</span>
                    <span class='value'><a href='mailto:{$email}' style='color: #2563EB; text-decoration: none;'>{$email}</a></span>
                </div>
                <div class='field'>
                    <span class='label'>Phone Number</span>
                    <span class='value'>{$phone}</span>
                </div>
            </div>
            
            <div class='section'>
                <h2 class='section-title'>Requirement</h2>
                <div class='field'>
                    <span class='label'>Product / Requirement</span>
                    <span class='value'>{$requirement}</span>
                </div>
                <div class='field'>
                    <span class='label'>Quantity / Approx. Requirement</span>
                    <span class='value'>{$quantity}</span>
                </div>
                <div class='field' style='margin-bottom: 0;'>
                    <span class='label'>Message</span>
                    <span class='value'>{$message}</span>
                </div>
            </div>
            
            <div class='footer'>
                Source: YUVA B2B SUPPLIES Website
            </div>
        </div>
    </body>
    </html>
    ";

    // Set email format to HTML
    $mail->isHTML(true);
    $mail->Body    = $htmlBody;
    $mail->AltBody = $plainText;

    $mail->send();
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Request sent successfully.']);
} catch (Exception $e) {
    // Log the detailed error server-side
    error_log("PHPMailer Error: " . $mail->ErrorInfo);
    // Return a generic error to the client
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send request.']);
}
?>
