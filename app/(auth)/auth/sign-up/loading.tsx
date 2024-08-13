import { InputSkeleton } from '@/app/components/ui';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '120%',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        Загрузка...
      </h1>
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
    </div>
  );
}
