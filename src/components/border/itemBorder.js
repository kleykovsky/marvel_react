import React, {Component} from "react";
import './border.scss'


const ItemBorder = (props) => {
    const selected = 'border__item_selected'
    return(
        <>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {className: 'border__item'})
                })
            }
        </>
    )
}

export default ItemBorder;