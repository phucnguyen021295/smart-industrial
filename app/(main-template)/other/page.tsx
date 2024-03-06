import {memo} from 'react';

function Other() {
  return (
    <main>
      <div>Hello Other</div>
    </main>
  );
}

export default memo(Other)