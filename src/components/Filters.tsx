import { useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '../styles'
import theme from '../theme'
import { US_STATES, type StateOption } from '../utils'
import { IoCloseOutline } from "react-icons/io5";

export default function Filters() {
  const [stateInput, setStateInput] = useState('')
  const [selectedStates, setSelectedStates] = useState<StateOption[]>([])
  const [statesDropdownIsOpen, setStatesDropdownIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const filteredStates = useMemo(() => {
    const normalized = stateInput.trim().toLowerCase()

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
  }, [stateInput, selectedStates])


  function handleUnselectState(value: string) {
    setSelectedStates((current) => current.filter((state) => state.value !== value))
  }

  return (
    <Container>
      <h3>Filters</h3>
      <h4>Price Range</h4>
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
        <h4>Location</h4>
        <SelectWrapper ref={wrapperRef}>
          <TagList>
            {selectedStates.map((selectedState) => (
              <Tag
                key={selectedState.value}
                onClick={() => handleUnselectState(selectedState.value)}
              >
                {selectedState.label}
                <IoCloseOutline />
              </Tag>
            ))}
          </TagList>

          <SearchInput
            id='state-search'
            value={stateInput}
            onChange={(event) => {
              setStateInput(event.target.value)
              setStatesDropdownIsOpen(true)
            }}
            onFocus={() => setStatesDropdownIsOpen(true)}
            onBlur={() => {
              // Delay closing to allow click events to register
              setTimeout(() => {
                if (!wrapperRef.current?.contains(document.activeElement)) {
                  setStatesDropdownIsOpen(false)
                }
              }, 10)
            }}
            placeholder='Search states'
            aria-expanded={statesDropdownIsOpen}
            aria-haspopup='listbox'
          />

          <Dropdown role='listbox' hidden={!statesDropdownIsOpen}>
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <Option
                  key={state.value}
                  type='button'
                  onClick={() => {
                    setSelectedStates((current) => [...current, state])
                    setStateInput('')
                    setStatesDropdownIsOpen(false)
                  }}
                >
                  <p>{state.label}</p>
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
  height: fit-content;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: ${theme.colors.primaryDark};
  }

  h4 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.textGrey};
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
  gap: 0.2rem;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primaryDark};
  border: 1px solid ${theme.colors.primary};
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  svg {
    width: 1.1rem;
    height: 1.2rem;
  }

  &:hover {
    opacity: 0.6;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.grey};
  font-size: 0.95rem;
  color: ${theme.colors.textBlack};
  
  &:focus {
    outline: none;
    border-radius: 0.5rem 0.5rem 0 0;
  }
`

const Dropdown = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  max-height: 220px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  border-radius: 0 0 0.75rem 0.75rem;
  margin-top: -1px;
  overflow-y: auto;
`

const Option = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0.5rem;
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
    color: ${theme.colors.textGrey};
    font-size: 0.8rem;
  }
`

const EmptyMessage = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 300;
  color: ${theme.colors.textGrey};
  font-size: 0.875rem;
`
