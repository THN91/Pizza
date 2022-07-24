import React from "react";

function Categories({categoryId, onClickCategory}) {
    const category = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    category.map((value, i) => (
                        <li key={i} onClick={() => onClickCategory(i)}
                            className={categoryId === i ? 'active' : ''}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;