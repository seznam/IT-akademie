import './modal.less';

export default function Modal({ children, title, onBackdrop }) {
  return (
    <div className='m-modal'>
      <div className='m-modal__backdrop' onClick={onBackdrop} />
      <div className='m-modal__content'>
        <h3 className='m-modal__title'>{title}</h3>
        {children}
      </div>
    </div>
  );
}
