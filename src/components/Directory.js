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
      {directory.map(d => (
        <>
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
        </>
      ))}
    </ul>
  )
}

function Directory(props) {
  const [directory, setDirectory] = useState(defaultDirectory)

  const matchPath = (i, d) => {
    let res = i.path + '/' + i.name === d.path + '/' + d.name
    if (!res && i.subDirectory) {
      i.subDirectory.map(s => matchPath(s, d)).map(bol => {
        if (bol) res = bol
      })
    }
    return res
  }
  const toggleExpand = (d) => {
    const newDirectory = directory.map(i => {
      if (i.type === 'folder' && matchPath(i, d)) {
        i.isOpen = !d.isOpen
      }
      return i
    })
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