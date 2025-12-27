"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Header from "../RootLayout/Header"
import Footer from "../RootLayout/Footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideFooter = pathname === "/announcement"

    return (
        <>
            <Header />
            {children}
            {!hideFooter && <Footer />}
        </>
    )
}