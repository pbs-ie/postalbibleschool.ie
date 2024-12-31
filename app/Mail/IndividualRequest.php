<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IndividualRequest extends Mailable
{
    use Queueable, SerializesModels;

    protected $request;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($studentInfo, $contactInfo, $latest)
    {
        $this->request = [
            'studentInfo' => (object) $studentInfo,
            'contactInfo' => (object) $contactInfo,
            'latest' => (object) $latest,
        ];
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            replyTo: [
                new Address($this->request['latest']->email, $this->request['latest']->firstname),
            ],
            subject: 'New Individual Request from '.$this->request['latest']->firstname.' '.$this->request['latest']->lastname,
            tags: ['individual']
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.request-individual',
            with: [
                'studentInfo' => $this->request['studentInfo'],
                'contactInfo' => $this->request['contactInfo'],
                'latest' => $this->request['latest'],
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
