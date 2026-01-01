"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"

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