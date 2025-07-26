"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { tv, VariantProps } from "tailwind-variants"
import { motion, AnimatePresence, Transition } from "motion/react"

const tabsVariants = tv({
  slots: {
    tabsRoot: "",
    tabsList:
      "inline-flex h-9 items-center justify-center p-[3px] text-muted-foreground",
    tabsTrigger:
      "dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    tabsContent:
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-1",
  },
  variants: {
    variant: {
      default: {
        tabsRoot: "flex flex-col gap-2",
        tabsList: "rounded-lg bg-muted w-fit",
        tabsTrigger:
          "ring-offset-background rounded-lg transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        tabsContent: "",
      },
      motion: {
        tabsRoot: "relative",
        tabsList: "",
        tabsTrigger:
          "cursor-default relative px-6 py-1.5 bg-transparent data-[state=active]:bg-background data-[state=active]:text-foreground",
        tabsContent: "",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface TabsContextValue {
  activeValue?: string
  focused?: string | null
  setFocused: (focused: TabsContextValue["focused"]) => void
  variant: VariantProps<typeof tabsVariants>["variant"]
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (context == undefined) {
    throw new Error("useTabsContext must be used within a TabsProvider")
  }
  return context
}

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tabs>,
    VariantProps<typeof tabsVariants> {}

function Tabs({ value: activeValue, variant, className, ...props }: TabsProps) {
  const [focused, setFocused] =
    React.useState<TabsContextValue["focused"]>(null)
  const { tabsRoot } = tabsVariants({ variant })

  return (
    <TabsContext.Provider value={{ activeValue, focused, setFocused, variant }}>
      <TabsPrimitive.Root
        className={cn(tabsRoot(), className)}
        value={activeValue}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { setFocused, variant } = useTabsContext()
  const { tabsList } = tabsVariants({ variant })

  return (
    <TabsPrimitive.List
      onMouseLeave={() => setFocused(null)}
      ref={ref}
      className={cn(tabsList(), className)}
      {...props}
    />
  )
})
TabsList.displayName = "TabsList"

const transition: Transition = {
  type: "spring",
  duration: 0.3,
  bounce: 0.1,
}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const { focused, setFocused, activeValue, variant } = useTabsContext()
  const { tabsTrigger } = tabsVariants({ variant })

  return (
    <TabsPrimitive.Trigger
      onMouseOver={() => setFocused(value)}
      onFocus={() => setFocused(value)}
      ref={ref}
      value={value}
      className={cn(tabsTrigger(), className)}
      {...props}
    >
      <span className="z-[2]">{children}</span>
      {variant === "motion" && (
        <>
          {activeValue === value && (
            <motion.div
              layout
              layoutId="tabs-underline"
              transition={transition}
              className="absolute w-full bg-foreground -bottom-[6px] h-[2px]"
            />
          )}
          <AnimatePresence mode="popLayout" initial={false}>
            {focused === value && (
              <motion.div
                layout
                layoutId="tabs-background"
                initial={{ opacity: 0, filter: "blur(1px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(1px)" }}
                transition={transition}
                className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-pink rounded-sm"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </TabsPrimitive.Trigger>
  )
})

TabsTrigger.displayName = "TabsTrigger"

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
