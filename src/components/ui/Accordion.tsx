// ============================================
// Accordion Component — Reusable expandable FAQ item
// ============================================

import { useState, useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionItemData {
  id: number
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemData[]
  allowMultiple?: boolean
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1])) // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const next = new Set<number>(allowMultiple ? prev : [])
      if (prev.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="faq-list">
      {items.map((item: AccordionItemData) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  )
}

interface AccordionItemProps {
  item: AccordionItemData
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const answerRef = useRef<HTMLDivElement>(null)

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span>{item.question}</span>
        <FaChevronDown className="faq-question-icon" />
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className="faq-answer"
        ref={answerRef}
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <div className="faq-answer-inner">
          {item.answer}
        </div>
      </div>
    </div>
  )
}
