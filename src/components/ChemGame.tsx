"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PeTableExplorer from './PeriodicTableExplorer'
import ElementsQuiz from './ElementsQuiz'

type GameMode = {
  id: string
  name: string
  description: string
  component: React.ComponentType
}

const GameModes: GameMode[] = [
  { 
    id: 'periodicTable', 
    name: 'Periodic Table Explorer', 
    description: 'Learn and test your knowledge of the periodic table',
    component: PeTableExplorer
  },
  { 
    id: 'elementQuiz', 
    name: 'Element Quiz', 
    description: 'Test your knowledge of element properties',
    component: ElementsQuiz
  },
  { 
    id: 'moleculeBuilder', 
    name: 'Molecule Builder', 
    description: 'Build molecules and learn about chemical bonding',
    component: () => <div>Molecule Builder Game Mode</div>
  },
  { 
    id: 'reactionSimulator', 
    name: 'Reaction Simulator', 
    description: 'Simulate and balance chemical reactions',
    component: () => <div>Reaction Simulator Game Mode</div>
  },
]

const LearningResources = [
  { id: 'periodicTrends', name: 'Periodic Trends', description: 'Learn about trends in the periodic table' },
  { id: 'bondingBasics', name: 'Bonding Basics', description: 'Understand different types of chemical bonds' },
  { id: 'reactionTypes', name: 'Types of Reactions', description: 'Explore different types of chemical reactions' },
  { id: 'acidBase', name: 'Acid-Base Chemistry', description: 'Dive into acid-base reactions and pH' },
]

export default function ChemistryGame() {
  const [activeGameMode, setActiveGameMode] = useState<string | null>(null)

  const renderGameMode = (mode: string | null) => {
    if (!mode) return null
    const selectedMode = GameModes.find(m => m.id === mode)
    return selectedMode ? <selectedMode.component /> : null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Chemistry Adventure</h1>
      
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="play">Play</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
        </TabsList>
        <TabsContent value="play">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GameModes.map((mode) => (
              <Card key={mode.id}>
                <CardHeader>
                  <CardTitle>{mode.name}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => setActiveGameMode(mode.id)}>Play</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="learn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LearningResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {activeGameMode && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{GameModes.find(mode => mode.id === activeGameMode)?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderGameMode(activeGameMode)}
          </CardContent>
        </Card>
      )}
    </div>
  )
}