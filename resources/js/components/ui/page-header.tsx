import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'

interface PageHeaderProps {
  title: string
  actions: {
    label: string
    type?: 'button' | 'link'
    href?: string
    onClick?: () => void
  }[]
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 w-full">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="ml-auto relative inline-block text-left">
        <Menu>
          <Menu.Button className="inline-flex justify-center items-center rounded-md bg-indigo-800 px-4 py-2 text-md text-white hover:opacity-90">
            {title}
            <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              {actions.map((action, index) => (
                <Menu.Item key={index}>
                  {({ active }) => {
                    const className = `${
                      active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                    } block w-full text-left px-4 py-2 text-sm`

                    return action.type === 'link' ? (
                      <Link href={action.href!} className={className}>
                        {action.label}
                      </Link>
                    ) : (
                      <button onClick={action.onClick} className={className}>
                        {action.label}
                      </button>
                    )
                  }}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
}
