import { useEffect, useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '../styles'
import theme from '../theme'
import { US_STATES, type StateOption } from '../utils'

export default function Filters() {
  const [query, setQuery] = useState('')
  const [selectedStates, setSelectedStates] = useState<StateOption[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const filteredStates = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return US_STATES.filter((state) => {
      if (selectedStates.some((selected) => selected.value === state.value)) {
        return false
      }

      if (!normalized) {
        return true
      }

      return (
        state.label.toLowerCase().includes(normalized) ||
        state.value.toLowerCase().includes(normalized)
      )
    })
  }, [query, selectedStates])

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  function handleStateToggle(option: StateOption) {
    setSelectedStates((current) => [...current, option])
    setQuery('')
    setIsOpen(true)
  }

  function handleRemoveState(value: string) {
    setSelectedStates((current) => current.filter((state) => state.value !== value))
  }

  return (
    <Container>
      <h3>Filters</h3>
      <PriceRangeContainer>
        <div>
          <label htmlFor='min-price'>Min price</label>
          <input id='min-price' type='number' />
        </div>
        <div>
          <label htmlFor='max-price'>Max price</label>
          <input id='max-price' type='number' />
        </div>
      </PriceRangeContainer>

      <Field>
        <label htmlFor='state-search'>States</label>
        <SelectWrapper ref={wrapperRef}>
          <TagList>
            {selectedStates.map((state) => (
              <Tag key={state.value}>
                {state.label}
                <button
                  type='button'
                  aria-label={`Remove ${state.label}`}
                  onClick={() => handleRemoveState(state.value)}
                >
                  ×
                </button>
              </Tag>
            ))}
          </TagList>

          <SearchInput
            id='state-search'
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder='Type to search states'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
          />

          <Dropdown role='listbox' hidden={!isOpen}>
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <Option
                  key={state.value}
                  type='button'
                  onClick={() => handleStateToggle(state)}
                >
                  <span>{state.label}</span>
                  <code>{state.value}</code>
                </Option>
              ))
            ) : (
              <EmptyMessage>No matching states</EmptyMessage>
            )}
          </Dropdown>
        </SelectWrapper>
      </Field>
    </Container>
  )
}

const Container = styled(Box)`
  max-height: 88vh;
  position: sticky;
  top: calc(72px + 1rem);
  z-index: 100;
  width: 100%;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: ${theme.colors.primaryDark};
  }
`

const PriceRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    label {
      font-size: 0.875rem;
      color: ${theme.colors.primaryDark};
      font-weight: 400;
    }
    
    input {
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid ${theme.colors.grey};
      font-size: 0.875rem;
      width: 100%;
      transition: border-color .15s ease-in-out;

      // Remove default number input spinners
      -moz-appearance: textfield;
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
      }
    }
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.25rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.primaryDark};
  }
`

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primaryDark};
  border: 1px solid ${theme.colors.primary};
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;

  button {
    border: none;
    background: transparent;
    color: ${theme.colors.primaryDark};
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.grey};
  font-size: 0.95rem;
  color: ${theme.colors.primaryDark};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}1a;
  }
`

const Dropdown = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  max-height: 220px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  border-radius: 0.75rem;
  padding: 0.5rem 0;
  margin-top: 0.35rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
`

const Option = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: ${theme.colors.primaryDark};
  font-size: 0.95rem;

  &:hover {
    background: ${theme.colors.primaryLight};
  }

  code {
    color: ${theme.colors.grey};
    font-size: 0.8rem;
  }
`

const EmptyMessage = styled.div`
  padding: 0.75rem 1rem;
  color: ${theme.colors.grey};
  font-size: 0.9rem;
`
