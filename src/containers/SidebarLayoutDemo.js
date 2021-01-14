import React from 'react'
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
}))

function SidebarLayoutDemo(props) {
  const classes = useStyles(props)


  return (
    <div className={classes.app}>
      <SidebarLayout
        sidebarWidth={200}
        sidebar={<Directory/>}
        contentPad={true}
      >
        <Typography>Main Content</Typography>
      </SidebarLayout>
    </div>
  )
}

export default SidebarLayoutDemo