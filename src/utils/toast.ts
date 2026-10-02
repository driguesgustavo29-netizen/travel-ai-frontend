import toast from 'react-hot-toast';

export const showSuccess = (msg: string) =>
  toast.success(msg, {
    style: {
      borderRadius: '12px',
      background: '#fff',
      color: '#111',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '12px 16px',
      fontSize: '14px',
    },
    iconTheme: { primary: '#0071e3', secondary: '#fff' },
  });

export const showError = (msg: string) =>
  toast.error(msg, {
    style: {
      borderRadius: '12px',
      background: '#fff',
      color: '#111',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '12px 16px',
      fontSize: '14px',
    },
    iconTheme: { primary: '#dc2626', secondary: '#fff' },
  });

export const showInfo = (msg: string) =>
  toast(msg, {
    icon: 'ℹ️',
    style: {
      borderRadius: '12px',
      background: '#fff',
      color: '#111',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '12px 16px',
      fontSize: '14px',
    },
  });
