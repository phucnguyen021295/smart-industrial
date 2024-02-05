import localFont from 'next/font/local'

const saira = localFont({
    src: [
      {
        path: './Saira-Regular.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: './Saira-SemiBold.woff',
        weight: '500',
        style: 'normal',
      },
      {
        path: './Saira-Medium.woff',
        weight: '600',
        style: 'normal',
      },
      {
        path: './Saira-Bold.woff',
        weight: '700',
        style: 'normal',
      },
    ],
  })

  export {saira}