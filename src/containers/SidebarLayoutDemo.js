import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import SidebarLayout from '../components/SidebarLayout'
import Directory from '../components/Directory'
import { Typography } from '@material-ui/core'


// import { SidebarLayout, Typography } from 'nferx-core-ui'

const useStyles = makeStyles(theme => ({
  app: {
    border: '1px solid gray',
    width: '100%',
  },
  mainContent: {
    border: '1px solid gray',
    height: 'calc(100vh - 60px)',
  }
}))

const defaultDirectory = []

function extractLevelsInDir (arr, acc=[]) {
  if (arr.length == 0 ) return acc;
  let pure = arr.filter(elm => !Array.isArray(elm.subDirectory));
  if (pure.length > 0) {
    acc.push(pure);
  }
  acc.concat(arr.filter(elm => Array.isArray(elm.subDirectory)).map(elm => extractLevelsInDir(elm.subDirectory, acc)));
  return acc;
}

function SidebarLayoutDemo(props) {
  const classes = useStyles(props)

  const [directory, setDirectory] = useState(defaultDirectory)
  const [dropdownData, dropdownDataSet] = useState([])
  const [mainContent, mainContentSet] = useState("")
  const [breadCrumbs, breadCrumbsSet] = useState([])

  useEffect(() => {
    loadData();
  },[]);

  const loadData = async() => {
    const response = await fetch("http://localhost:3004/directory");
    const data = await response.json();
    setDirectory(data)
  }

  const onFileClick = d => {
    mainContentSet(d.content)
    breadCrumbsSet([...d.path.split('/').splice(1), d.name])
  }

  

  // const getSiblings = (dir,partialPath) => {
  //   debugger
  //   // const siblings = dir.map(i=>{
  //   //   if (partialPath.length === 1){
  //   //     return i.name
  //   //   } else {
  //   //     if (i.name === partialPath[0]) {
  //   //      return getSiblings(i.subDirectory,partialPath.splice(1))
  //   //     }
  //   //   }
  //   // })
  //   // return siblings
  // }

  return (
    <div className={classes.app}>
      <SidebarLayout
        sidebarWidth={200}
        sidebar={<Directory
          onFileClick={onFileClick}
          directory={directory}
          setDirectory={setDirectory}
        />}
        contentPad
      >

        <div className={classes.breadCrumbs}>
          {breadCrumbs.map( (b,i) => (<span key={i}>
            <span onClick={()=> {
              const allLevels = extractLevelsInDir(directory)
              debugger
              const siblings = allLevels.find(d=>d.includes(b))
              dropdownDataSet(siblings)
            }}>{b}</span>
            {!(i===(breadCrumbs.length - 1)) && <span>{`>`}</span>}
          </span>))}
        </div>
        <div>
            {dropdownData.map(d => (<span>{d}</span>))}
        </div>
        <div className={classes.mainContent}>
          <Typography>{mainContent}</Typography>
        </div>
      </SidebarLayout>
    </div>
  )
}

export default SidebarLayoutDemo