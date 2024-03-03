'use client'

import {ReactNode} from "react";

export const PageWrapper = ({ children }: { children?: ReactNode }) => {
    return <div className="page-wrapper">{children}</div>
}
