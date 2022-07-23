import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={260}
        height={460}
        viewBox="0 0 260 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="128" cy="157" r="107" />
        <rect x="2" y="295" rx="7" ry="7" width="250" height="24" />
        <rect x="5" y="329" rx="8" ry="8" width="245" height="60" />
        <rect x="7" y="423" rx="9" ry="9" width="82" height="32" />
        <rect x="73" y="451" rx="0" ry="0" width="0" height="1" />
        <rect x="124" y="418" rx="12" ry="12" width="123" height="40" />
    </ContentLoader>
)

export default Skeleton;