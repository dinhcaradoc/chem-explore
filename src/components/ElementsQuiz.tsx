import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage-instance";

type Element = {
  symbol: string
  name: string
  atomicNumber: number
}

const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2 },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5 },
]

const ElementsQuiz: React.FC = () => {
  const [currentElement, setCurrentElement] = useState<Element | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [queAnswered, setQueAnswered] = useState(0)

  const getRandomElement = () => {
    return elements[Math.floor(Math.random() * elements.length)]
  }

  const generateOptions = (correct: string) => {
    const allOptions = elements.map(e => e.name).filter(name => name !== correct)
    const shuffled = allOptions.sort(() => 0.5 - Math.random())
    return [correct, ...shuffled.slice(0, 3)].sort(() => 0.5 - Math.random())
  }


  const newQuestion = () => {
    const element = getRandomElement()
    setCurrentElement(element)
    setOptions(generateOptions(element.name))
  }

  const handleAnswer = (answer: string) => {
    if (answer === currentElement?.name) {
      setScore(score + 1)
    }
    setQueAnswered(queAnswered + 1)
    newQuestion()
  }

  useEffect(() => {
    newQuestion()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Elements Quiz</h2>
      <Card>
        <CardHeader>
          <CardTitle>What is the name of the element with symbol {currentElement?.symbol}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <p className="mt-4">Score: {score} / {queAnswered}</p>
    </div>
  )
}

export default ElementsQuiz