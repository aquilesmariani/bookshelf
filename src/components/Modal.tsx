// Modal.tsx
import React, { FC, ReactNode } from 'react'
import styles from '@/styles/Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
