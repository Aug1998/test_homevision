import { useRef } from 'react'
import styled from '@emotion/styled'
import { Box } from '../styles'
import theme from '../theme'
import { IoCloseOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../store'
import { selectState, setMaxPrice, setMinPrice, setStatesDropdownIsOpen, setStatesSearchInput, unselectState } from '../store/slices/Filters/filters.slice'
import { isPriceRangeValid } from '../store/slices/Filters/filters.util';
import { BiSolidError } from "react-icons/bi";
import { HiMiniCurrencyDollar } from "react-icons/hi2";

export default function Filters() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { priceRange, states: { dropdownIsOpen, searchInput, selectedStates, dropdownOptions } } = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  const formatCurrency = (value: number): string => {
    if (!value) return ''
    return `${Math.round(value).toLocaleString('en-US')}`
  }

  const handlePriceInput = (value: string): number => {
    if (value === '') {
      return 0
    }
    return parseFloat(value.replace(/[^0-9]/g, ''))
  }

  return (
    <Container>
      <h3>Filters</h3>
      <form>
        <Field>
          <h4>Price Range</h4>
          <PriceRangeContainer>
            <fieldset>
              <label htmlFor='min-price'>Min price</label>
              <HiMiniCurrencyDollar />
              <input
                id='min-price'
                type='text'
                value={formatCurrency(priceRange.min)}
                onChange={(e) => dispatch(setMinPrice(handlePriceInput(e.target.value)))}
                placeholder='0'
                maxLength={7}
                aria-invalid={!isPriceRangeValid(priceRange)}
                data-invalid={!isPriceRangeValid(priceRange)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor='max-price'>Max price</label>
              <HiMiniCurrencyDollar />
              <input
                id='max-price'
                type='text'
                value={formatCurrency(priceRange.max)}
                onChange={(e) => dispatch(setMaxPrice(handlePriceInput(e.target.value)))}
                placeholder='0'
                maxLength={7}
                aria-invalid={!isPriceRangeValid(priceRange)}
                data-invalid={!isPriceRangeValid(priceRange)}
              />
            </fieldset>
          </PriceRangeContainer>
          {!isPriceRangeValid(priceRange) && (
            <ErrorMessage>
              <BiSolidError />
              The maximum price must be greater than the minimum.
            </ErrorMessage>
          )}
        </Field>
        <Field>
          <fieldset>
            <h4>Location</h4>
            <SelectWrapper ref={wrapperRef}>
              {selectedStates.length > 0 && (
                <TagList>
                  {selectedStates.map((selectedState) => (
                    <Tag
                      key={selectedState.value}
                      onClick={() => dispatch(unselectState(selectedState.value))}
                    >
                      {selectedState.label}
                      <IoCloseOutline />
                    </Tag>
                  ))}
                </TagList>
              )}

              <SearchInput
                id='state-search'
                value={searchInput}
                onChange={(event) => {
                  dispatch(setStatesSearchInput(event.target.value))
                  dispatch(setStatesDropdownIsOpen(true))
                }}
                onFocus={() => dispatch(setStatesDropdownIsOpen(true))}
                onBlur={() => {
                  // Delay closing to allow click events to register
                  setTimeout(() => {
                    if (!wrapperRef.current?.contains(document.activeElement)) {
                      dispatch(setStatesDropdownIsOpen(false))
                    }
                  }, 10)
                }}
                placeholder='Search states'
                aria-expanded={dropdownIsOpen}
                aria-haspopup='listbox'
              />

              <Dropdown role='listbox' hidden={!dropdownIsOpen}>
                {dropdownOptions.length > 0 ? (
                  dropdownOptions.map((state) => (
                    <Option
                      key={state.value}
                      type='button'
                      onClick={() => {
                        dispatch(selectState(state))
                        dispatch(setStatesSearchInput(''))
                        dispatch(setStatesDropdownIsOpen(false))
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
          </fieldset>
        </Field>
      </form>
    </Container>
  )
}

const Container = styled(Box)`
  max-height: 88vh;
  position: sticky;
  top: 1rem;
  z-index: 100;
  width: 100%;
  height: fit-content;

  fieldset {
    all: unset
  }

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
    margin-bottom: 0.3rem;
  }
`

const PriceRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
    
    svg {
      position: absolute;
      bottom: 0.5rem;
      left: 0.6rem;
      font-size: 1.2rem;
      color: ${theme.colors.textGrey};
    }
    
    label {
      font-size: 0.875rem;
      color: ${theme.colors.primaryDark};
      font-weight: 400;
    }
    
    input {
      padding: 0.5rem;
      padding-left: 1.95rem;
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
      
      &[data-invalid='true'] {
        border-color: ${theme.colors.red};
      }
    }
    &:focus-within {
      svg {
        color: ${theme.colors.textGrey};
      }
    }
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.primaryDark};
  }
  
  &:not(:first-of-type) {
    margin-top: 1.25rem;
  }
`

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.red};
  line-height: 1.1rem;
  margin-top: 0.25rem;
  svg {
    transform: translateY(2px);
    font-size: 0%.9;
    margin-right: 3px;
  }
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.3rem 0 0.5rem;
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

  &::placeholder {
    color: ${theme.colors.textGrey};
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
