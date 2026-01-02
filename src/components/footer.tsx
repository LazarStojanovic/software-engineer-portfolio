import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
  ];

  return (
    <footer className='border-t border-border bg-background'>
      <div className='container-max section-padding py-12'>
        <div className='grid md:grid-cols-3 gap-8 items-center'>
          {/* Left - Branding */}
          <div className='text-center md:text-left'>
            <p className='font-display font-semibold text-lg text-foreground mb-1'>
              {t('hero.name')}
            </p>
            <p className='text-sm text-muted-foreground'>{t('hero.role')}</p>
          </div>

          {/* Center - Social Links */}
          <div className='flex justify-center gap-4'>
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.name}
                className='w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <link.icon className='h-5 w-5' />
              </a>
            ))}
          </div>

          {/* Right - Status + Built with */}
          <div className='text-center md:text-right space-y-2'>
            <div className='flex items-center justify-center md:justify-end gap-2 text-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500' />
              </span>
              <span className='text-muted-foreground'>{t('footer.status')}</span>
            </div>
            <p className='text-xs text-muted-foreground'>{t('footer.builtWith')}</p>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className='mt-8 pt-8 border-t border-border'>
          <p className='text-center text-sm text-muted-foreground'>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
