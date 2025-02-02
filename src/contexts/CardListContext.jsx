import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { createContext } from "react";

const columns = [
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
]

const CardListContext = createContext({
    list: columns.map(item => ({
        index: item.index,
        content: [],
    })),
    dispatch: () => { },
})

export const CardListProvider = ({ children }) => {
    // const [todoList, setTodoList] = useState([])
    // const [progressList, setProgressList] = useState([])
    // const [doneList, setDoneList] = useState([])
    const [todoList, setTodoList] = useLocalStorage({ key: 'todo', defaultValue: [] })
    const [progressList, setProgressList] = useLocalStorage({ key: 'progress', defaultValue: [] })
    const [doneList, setDoneList] = useLocalStorage({ key: 'done', defaultValue: [] })

    const mappingList = useMemo(() => ({
        todo: {
            list: todoList,
            setter: setTodoList,
        },
        progress: {
            list: progressList,
            setter: setProgressList,
        },
        done: {
            list: doneList,
            setter: setDoneList,
        },
    }), [todoList, progressList, doneList])

    const initCard = useCallback((index) => {
        const { list, setter } = mappingList[index]
        setter([
            ...list,
            {
                description: '',
                edit: true,
            }
        ])
    }, [mappingList])

    const addCard = useCallback((index, itemValue) => {
        const { list, setter } = mappingList[index]
        setter([
            ...list,
            {
                description: itemValue,
                edit: false,
            },
        ])
    }, [mappingList])

    const deleteCard = useCallback((listIndex, itemIndex) => {
        const { list, setter } = mappingList[listIndex]
        setter(list.toSpliced(itemIndex, 1))
    }, [mappingList])

    const editCard = useCallback((listIndex, itemIndex) => {
        const { list, setter } = mappingList[listIndex]
        const newList = [...list]
        newList[itemIndex] = {
            ...newList[itemIndex],
            edit: true,
        }
        setter(newList)
    }, [mappingList])

    const saveChange = useCallback((listIndex, itemIndex, itemValue) => {
        const { list, setter } = mappingList[listIndex]
        const newList = [...list]
        newList[itemIndex] = {
            ...newList[itemIndex],
            description: itemValue,
            edit: false,
        }
        setter(newList)
    }, [mappingList])

    const cancelChange = useCallback((listIndex, itemIndex) => {
        const { list, setter } = mappingList[listIndex]
        const newList = [...list]
        newList[itemIndex] = {
            ...newList[itemIndex],
            edit: false,
        }
        setter(newList)
    }, [mappingList])

    const moveCard = useCallback((src, dest, itemIndex) => {
        if (src === dest) return

        const { list: srcList } = mappingList[src]

        const itemValue = srcList[itemIndex].description
        addCard(dest, itemValue)
        deleteCard(src, itemIndex)
    }, [addCard, deleteCard, mappingList])

    const dispatch = useCallback((action, ...args) => {
        switch (action) {
            case 'init': {
                initCard(...args)
                break
            }
            case 'add': {
                addCard(...args)
                break
            }
            case 'delete': {
                deleteCard(...args)
                break
            }
            case 'edit': {
                editCard(...args)
                break
            }
            case 'save': {
                saveChange(...args)
                break
            }
            case 'cancel': {
                cancelChange(...args)
                break
            }
            case 'move': {
                moveCard(...args)
                break
            }
            default: break
        }
    }, [addCard, cancelChange, deleteCard, initCard, moveCard, saveChange, editCard])

    return (
        <CardListContext.Provider
            value={{
                list: [
                    {
                        index: 'todo',
                        content: todoList,
                    },
                    {
                        index: 'progress',
                        content: progressList,
                    },
                    {
                        index: 'done',
                        content: doneList,
                    },
                ],
                dispatch: dispatch
            }}
        >
            {children}
        </CardListContext.Provider>
    )
}

export const useCardList = (index) => {
    const { list, dispatch } = useContext(CardListContext)
    return {
        list: list.find(item => item.index === index)?.content ?? [],
        dispatch: dispatch,
    }
}
