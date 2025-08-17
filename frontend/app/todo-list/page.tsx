import Image from 'next/image'
import Link from 'next/link'

export default function TodoList() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Todo List Name</h2>
      <ul>
        <li>first</li>
        <li>second</li>
        <li>thisrd</li>
        <li>fourth</li>
      </ul>
    </main>
  )
}
