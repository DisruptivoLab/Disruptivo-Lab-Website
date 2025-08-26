/**
 * LiquidAccordion Component
 * Acordeón con efectos Liquid Glass y animaciones fluidas
 */

'use client';

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
}

interface LiquidAccordionProps {
    items: AccordionItem[];
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    className?: string;
    collapsible?: boolean;
}

export function LiquidAccordion({
    items,
    type = 'single',
    defaultValue,
    value,
    onValueChange,
    className,
    collapsible = true
}: LiquidAccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(() => {
        if (value !== undefined) {
            return Array.isArray(value) ? value : [value];
        }
        if (defaultValue !== undefined) {
            return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        }
        return [];
    });

    // Sincronizar con prop value
    useEffect(() => {
        if (value !== undefined) {
            setOpenItems(Array.isArray(value) ? value : [value]);
        }
    }, [value]);

    const handleToggle = (itemId: string) => {
        const item = items.find(item => item.id === itemId);
        if (item?.disabled) return;

        let newOpenItems: string[];

        if (type === 'single') {
            // Solo un item puede estar abierto
            if (openItems.includes(itemId)) {
                newOpenItems = collapsible ? [] : [itemId];
            } else {
                newOpenItems = [itemId];
            }
        } else {
            // Múltiples items pueden estar abiertos
            if (openItems.includes(itemId)) {
                newOpenItems = openItems.filter(id => id !== itemId);
            } else {
                newOpenItems = [...openItems, itemId];
            }
        }

        setOpenItems(newOpenItems);

        const returnValue = type === 'single'
            ? (newOpenItems[0] || '')
            : newOpenItems;

        onValueChange?.(returnValue);
    };

    return (
        <div className={cn("space-y-2", className)}>
            {items.map((item) => (
                <AccordionItemComponent
                    key={item.id}
                    item={item}
                    isOpen={openItems.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                />
            ))}
        </div>
    );
}

interface AccordionItemComponentProps {
    item: AccordionItem;
    isOpen: boolean;
    onToggle: () => void;
}

function AccordionItemComponent({
    item,
    isOpen,
    onToggle
}: AccordionItemComponentProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    // Calcular altura del contenido
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [item.content, isOpen]);

    return (
        <div
            className={cn(
                "backdrop-blur-[8px] backdrop-saturate-150 border rounded-2xl overflow-hidden",
                "transition-all duration-300 ease-in-out",
                // Tema oscuro
                "dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/15 dark:hover:border-white/30",
                // Tema claro
                "light:bg-black/10 light:border-black/20 light:hover:bg-black/15 light:hover:border-black/30",
                item.disabled ? "opacity-50" : ""
            )}
        >
            {/* Brillo interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none" />

            {/* Header */}
            <button
                onClick={onToggle}
                disabled={item.disabled}
                className={cn(
                    "w-full px-6 py-4 text-left",
                    "flex items-center justify-between",
                    "transition-all duration-200 ease-in-out",
                    "focus:outline-none relative z-10",
                    // Tema oscuro
                    "dark:hover:bg-white/5 dark:focus:bg-white/5",
                    // Tema claro
                    "light:hover:bg-black/5 light:focus:bg-black/5",
                    item.disabled ? "cursor-not-allowed" : "cursor-pointer"
                )}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
            >
                <span className="font-heading font-medium pr-4 dark:text-white light:text-black">
                    {item.title}
                </span>

                <ChevronDown
                    className={cn(
                        "w-5 h-5 transition-transform duration-300 ease-in-out flex-shrink-0",
                        "dark:text-white/70 light:text-black/70",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>

            {/* Content */}
            <div
                id={`accordion-content-${item.id}`}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    height: isOpen ? `${contentHeight}px` : '0px'
                }}
            >
                <div
                    ref={contentRef}
                    className="px-6 pb-4 font-body dark:text-white/80 light:text-black/80"
                >
                    {item.content}
                </div>
            </div>
        </div>
    );
}