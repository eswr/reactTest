import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'

const useStyles = makeStyles(theme => ({
  wrapper: {
    listStyleType: 'none',
    paddingLeft: '16px',
  },
  icon: {
    width: 16,
    display: 'inline-block',
    textAlign: 'center',
  },
  file: {
    paddingLeft: '16px',
  },
}))

const defaultDirectory = [
  {
    path: '.',
    type: 'folder',
    name: 'src',
    isOpen: false,
    subDirectory: [
      {
        path: './src',
        type: 'folder',
        name: 'component',
        isOpen: false,
        subDirectory: [
          {
            path: './src/component',
            type: 'folder',
            name: 'component',
            isOpen: false,

          },
        ]
      },
      {
        path: './src',
        type: 'folder',
        name: 'container',
        isOpen: false,
      },
      {
        path: './src',
        type: 'file',
        name: 'App.js',
      },
    ]
  },
  {
    path: '.',
    type: 'file',
    name: 'package.js',
  },
]

const FileSystem = ({ directory, toggleExpand }) => {
  const classes = useStyles()

  return (
    <ul className={classes.wrapper}>
      {directory.map(d => (<div key={d.path + '/' + d.name}>
        <li onClick={() => toggleExpand(d)}>
          {d.type === 'folder' && (d.isOpen ? (
            <span className={classes.icon}>+</span>
          ) : (
              <span className={classes.icon}>-</span>
            )
          )}
          <span className={cx({ [classes.file]: d.type === 'file' })}>
            {d.name}
          </span>
        </li>
        {d.subDirectory && (d.isOpen && <FileSystem directory={d.subDirectory} toggleExpand={toggleExpand} />)}
      </div>))}
    </ul>
  )
}

function Directory() {
  const [directory, setDirectory] = useState(defaultDirectory)

  const matchAndToggle = (dir, partialPath, d) => dir.map(i => {
    if (i.name === partialPath[0]){
      if (partialPath.length === 1){
        i.isOpen =!d.isOpen
      } else {
        matchAndToggle(i.subDirectory,partialPath.splice(1),d)
      }
    }
    return i
  })
  
  const toggleExpand = (d) => {
    const breadCrumbs = [...d.path.split('/'), d.name].splice(1)
    const newDirectory = matchAndToggle(directory,breadCrumbs,d)
    setDirectory(newDirectory)
  }

  const addDirectory = () => { debugger }
  const deleteDirectory = () => { debugger }


  return (
    <div>
      <div>
        <button onClick={addDirectory}>Add</button>
        <button onClick={deleteDirectory}>Del</button>
      </div>
      <FileSystem directory={directory} toggleExpand={toggleExpand} />
    </div>
  )
}

export default Directory