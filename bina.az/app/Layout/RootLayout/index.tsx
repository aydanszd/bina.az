"use client"
import React from "react"
import Header from "../RootLayout/Header"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}