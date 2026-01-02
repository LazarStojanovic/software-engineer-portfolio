import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, Github, Linkedin, Send, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lazar-stojanovic-7409051ba',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:stojanovic.lazar.lazar@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('nav.contact')} - {t('hero.name')}
        </title>
        <meta name='description' content='Get in touch for collaboration or opportunities' />
      </Helmet>

      <div className='min-h-screen pt-24 pb-16 bg-background'>
        <div className='container-max section-padding'>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Button asChild variant='ghost' className='mb-8'>
              <Link to='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>

            <h1 className='page-title text-foreground mb-4'>{t('contact.headline')}</h1>
            <p className='text-xl text-muted-foreground mb-12 max-w-2xl'>
              I'm always interested in hearing about new projects, opportunities, or just having a
              conversation about technology.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-12 max-w-5xl'>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-8'
                    >
                      <CheckCircle className='h-12 w-12 text-green-500 mx-auto mb-4' />
                      <h3 className='text-xl font-semibold mb-2'>Message Sent!</h3>
                      <p className='text-muted-foreground'>
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          id='name'
                          name='name'
                          placeholder='Your name'
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          placeholder='you@example.com'
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                          id='message'
                          name='message'
                          placeholder='Tell me about your project or opportunity...'
                          rows={5}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button type='submit' className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className='mr-2 h-4 w-4' />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
              className='space-y-8'
            >
              <div>
                <h2 className='text-2xl font-semibold mb-4'>Connect with me</h2>
                <p className='text-muted-foreground mb-6'>
                  Prefer to reach out directly? Find me on these platforms.
                </p>

                <div className='space-y-4'>
                  {socialLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:bg-accent transition-colors group'
                    >
                      <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                        <link.icon className='h-5 w-5 text-primary' />
                      </div>
                      <span className='font-medium'>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className='bg-muted/50 rounded-2xl p-6 border border-border'>
                <h3 className='font-semibold mb-2'>Current Status</h3>
                <div className='flex items-center gap-2'>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500' />
                  </span>
                  <span className='text-muted-foreground'>Open to opportunities</span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>
                  Looking for senior frontend roles at product-focused companies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
