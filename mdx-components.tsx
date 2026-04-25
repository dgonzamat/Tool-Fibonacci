import type { MDXComponents } from "mdx/types"
import type { ComponentProps } from "react"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentProps<"h1">) => (
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 mt-2 tracking-wider text-white"
        {...props}
      />
    ),
    h2: (props: ComponentProps<"h2">) => (
      <h2
        className="text-2xl sm:text-3xl font-light mt-12 mb-4 tracking-wider text-yellow-400 scroll-mt-24"
        {...props}
      />
    ),
    h3: (props: ComponentProps<"h3">) => (
      <h3 className="text-lg sm:text-xl mt-8 mb-3 text-white font-semibold" {...props} />
    ),
    p: (props: ComponentProps<"p">) => (
      <p className="text-gray-300 leading-relaxed mb-4 text-base" {...props} />
    ),
    a: ({ href, children, ...rest }: ComponentProps<"a">) => {
      const external = !!href && /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-yellow-400 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
          {...rest}
        >
          {children}
        </a>
      )
    },
    ul: (props: ComponentProps<"ul">) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4" {...props} />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4" {...props} />
    ),
    li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
    blockquote: (props: ComponentProps<"blockquote">) => (
      <blockquote
        className="border-l-4 border-yellow-500/60 pl-4 my-6 italic text-gray-300"
        {...props}
      />
    ),
    code: (props: ComponentProps<"code">) => (
      <code
        className="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded font-mono text-sm"
        {...props}
      />
    ),
    pre: (props: ComponentProps<"pre">) => (
      <pre
        className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto text-sm"
        {...props}
      />
    ),
    table: (props: ComponentProps<"table">) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse" {...props} />
      </div>
    ),
    th: (props: ComponentProps<"th">) => (
      <th
        className="border border-gray-700 bg-gray-800 px-3 py-2 text-left text-yellow-300"
        {...props}
      />
    ),
    td: (props: ComponentProps<"td">) => (
      <td className="border border-gray-700 px-3 py-2 text-gray-300" {...props} />
    ),
    hr: () => <hr className="border-gray-700 my-10" />,
    ...components,
  }
}
