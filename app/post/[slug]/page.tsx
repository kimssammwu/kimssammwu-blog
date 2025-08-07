import React from "react";
import Codespace from "@/component/mdx/codeblock"
import AiSummarySecotr from "@/component/mdx/aiSummarySector"
import { Metadata } from "next";


function Heading({level, children}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>,HTMLHeadingElement> & 
{ level: 1 | 2 | 3 | 4 | 5 | 6; })
{
	const tag = `h${level}`;
	return React.createElement(tag,
		{
			id: `${children}`,
			className: "mt-12 mb-2 text-xl font-bold text-gray-800 dark:text-gray-300",
		},
		<a href={`#${children}`}>{children}</a>,
	);
}
// ({params,}: {params: Promise<{ slug: string }>}) {
// 	let { slug } = await params;
// 	let { default: Post, metadata } = await import(`@/content/posts/${slug}.mdx`);
// 	let { title } = metadata;
export async function generateMetadata({ params, }: {params: Promise<{ slug: string }>}): Promise<Metadata> {
	// read route params
	// const { id } = await params
	let { slug } = await params;
	let { default: Post, metadata } = await import(`@/content/posts/${slug}.mdx`);
	let { title } = metadata;
   
	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []
   
	return {
	  title: title,
	//   openGraph: {
	// 	images: ['/some-specific-page-image.jpg', ...previousImages],
	//   },
	}
  }

// export function generateStaticParams() {
//   return [{ slug: 'none' }, { slug: 'test' }, {slug: "apple"}, {slug: "250113-understanding-clipboard"}]
  
//   // // 이런 식으로 페이지에 slug 미리 지정하고 다이나믹 파람 꺼주면 됌.
//   // return posts.map((post) => ({
//   //   slug: post.slug, // 동적 경로에 사용할 slug
//   // }));
// }

// function tagH1({ children }: { children: React.ReactNode }) {
//   return <h1>{children}</h1>
// }

// export const dynamicParams = false


var overrideComponents = {
	// Heading Tag 
	h1: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={1} {...props}>{children}</Heading>
	),
	h2: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={2} {...props}>{children}</Heading>
	),
	h3: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={3} {...props}>{children}</Heading>
	),
	h4: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={4} {...props}>{children}</Heading>
	),
	h5: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={5} {...props}>{children}</Heading>
	),
	h6: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
		<Heading level={6} {...props}>{children}</Heading>
	),
  
    // a Tag
    a: ({href, children, ...props} : {
      href?: string
      children: React.ReactNode
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return (
        <a href={href} className="text-blue-600 no-underline hover:text-blue-800 hover:underline transition-colors duration-300" {...props} >
          {children}
        </a>
      )
    },

	figure: ({children}: { children: React.ReactNode }) => {
		return <Codespace children={children} />
	}

}



export default async function Page({params,}: {params: Promise<{ slug: string }>}) {
	let { slug } = await params;
	let { default: Post, metadata } = await import(`@/content/posts/${slug}.mdx`);
	let { title } = metadata;

	return (
		<div className="prose prose-invert leading-9 text-gray-700 dark:text-gray-500 px-6 sm:px-6 md:px-8 mx-auto mt-12 mb-6 relative">
			<h1 className="mb-8 text-4xl font-semibold text-gray-900 dark:text-white"> {title} </h1>
			<AiSummarySecotr children={""} />
			<Post components={overrideComponents} />
		</div>
	)
}
