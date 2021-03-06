import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Input from './Input'
import InnerList from './InnerList'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 33.33%;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  background-color: #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2 ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#eeeeee')};
`

export default class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.props }
  }

  handleChange = value => {
    const newState = {
      ...this.state
    }

    newState.column.title = value
    this.setState({ ...newState })
  }

  render() {
    const {
      column,
      tasks,
      columnHeaderStyle,
      columnContentStyle,
      taskContentStyle
    } = this.props

    return (
      <Draggable draggableId={column.id} index={this.props.index}>
        {draggableProvided => (
          <Container
            {...draggableProvided.draggableProps}
            ref={draggableProvided.innerRef}
          >
            <Header
              {...draggableProvided.dragHandleProps}
              style={{ ...columnHeaderStyle }}
            >
              <Input
                value={this.state.column.title}
                onChange={this.handleChange}
              />
            </Header>
            <Droppable droppableId={column.id} type="task">
              {(droppableProvided, snapshot) => (
                <TaskList
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  style={{ ...columnContentStyle }}
                >
                  <InnerList
                    tasks={tasks}
                    taskContentStyle={taskContentStyle}
                  />
                  {droppableProvided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}

Column.propTypes = {
  tasks: PropTypes.array.isRequired,
  column: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  columnHeaderStyle: PropTypes.object,
  columnContentStyle: PropTypes.object,
  taskContentStyle: PropTypes.object
}

Column.defaultProps = {
  columnHeaderStyle: {},
  columnContentStyle: {},
  taskContentStyle: {}
}
