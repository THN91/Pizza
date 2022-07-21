import React from "react";

function Categories() {
    const category = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onClickCategory = (index) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {
                    category.map((value, i) => (
                        <li key={i} onClick={() => onClickCategory(i)}
                            className={activeIndex === i ? 'active' : ''}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;