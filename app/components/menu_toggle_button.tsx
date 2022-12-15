import React, {FC, useRef} from 'react';
import './MenuButton.scss';
import styled from "styled-components";

interface MenuButtonProps {
}

const ShadedBackground = styled.div`
  :hover {
    background: lightblue;
  }
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: max-content;
`

const MenuToggler = styled.div`
  z-index: 999;
  height: 28px;
  width: 28px;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  span,
  span::before,
  span::after {
    position: absolute;
    content: '';
    width: 28px;
    height: 2.5px;
    background: #005c9c;
    border-radius: 20px;
    transition: 500ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  span::before {
    top: -8px;
  }

  span::after {
    top: 8px;
  }

  &.active > span {
    background: transparent;
  }

  &.active > span::before,
  &.active > span::after {
    background: #005c9c;
    top: 0px;
  }

  &.active > span::before {
    transform: rotate(-225deg);
  }

  &.active > span::after {
    transform: rotate(225deg);
  }
`
const MenuButton: FC<MenuButtonProps> = (props) => {
    const shadedBackground = useRef<HTMLDivElement>();
    const onClick = ({currentTarget}) => {
        currentTarget.classList.toggle('active')
    }
    return (
        <ShadedBackground>
            <MenuToggler onClick={onClick}>
                <span></span>
            </MenuToggler>
        </ShadedBackground>
    );
}

export default MenuButton;