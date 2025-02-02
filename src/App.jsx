import './App.css'
import { Container, MantineProvider, Title } from '@mantine/core'
import '@mantine/core/styles.css';
import { Column } from './Column'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CardListProvider } from './contexts/CardListContext';
import { useMemo } from 'react';

function App() {
  const columns = useMemo(() => [
    {
      index: 'todo',
      title: 'To-Do',
    },
    {
      index: 'progress',
      title: 'In Progress',
    },
    {
      index: 'done',
      title: 'Done',
    },
  ], [])

  return (
    <>
      <MantineProvider>
        <DndProvider backend={HTML5Backend}>
          <CardListProvider>
            {/* <DetailsModalContainer> */}
            <Container className='app-container' fluid>
              <Title className='app-title'>Kanban Board Demo</Title>
              <Container className='board-container' fluid>
                {columns.map(({ index, title }) =>
                  <Column key={index} index={index} title={title} />
                )}
              </Container>
            </Container>
            {/* </DetailsModalContainer> */}
          </CardListProvider>
        </DndProvider>
      </MantineProvider>
    </>
  )
}

export default App
