import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Element = {
  symbol: string
  name: string
  atomicNumber: number
  category: string
}

const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'nonmetal' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'noble gas' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'alkali metal' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'alkaline earth metal' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'metalloid' },
]

const PeTableExplorer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Periodic Table Explorer</h2>
      <div className="grid grid-cols-18 gap-1 mb-4">
        {elements.map((element) => (
          <Button
          key={element.symbol}
          onClick={() => setSelectedElement(element)}
          className={`w-12 h-12 text-xs ${
            element.category === 'nonmetal' ? 'bg-green-500':
            element.category === 'noble gas' ? 'bg-purple-500':
            element.category === 'alkali metal' ? 'bg-red-500':
            element.category === 'alkaline earth metal' ? 'bg-orange-500':
            element.category === 'metalloid' ? 'bg-yellow-500':
            'bg-gray-500'         
          }`}
          >
            {element.symbol}
          </Button>
        ))}
      </div>
      {selectedElement && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedElement.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Symbol: {selectedElement.symbol}</p>
            <p>Atomic Number: {selectedElement.atomicNumber}</p>
            <p>Category: {selectedElement.category}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PeTableExplorer