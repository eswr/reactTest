import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Hidden, IconButton } from '@material-ui/core'
import cx from 'classnames'
import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    // height: `calc(100vh - ${theme.appBarHeight}px)`,
    height: `100vh`,
  },
  sidebar: {
    left: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#FFF',
    borderRight: '1px solid gray',
    position: 'relative',
    zIndex: 1,
    transition: theme.transitions.create(
      'width',
      theme.transitions.duration.standard,
      theme.transitions.easing.easeIn,
    ),
  },
  sidebarInner: {
    transition: theme.transitions.create(
      'opacity',
      theme.transitions.duration.standard,
      theme.transitions.easing.easeIn,
    ),
  },
  content: {
    display: 'flex',
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    maxHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
    },
  },
  contentPad: {
    padding: "24px 16px",
    [theme.breakpoints.down('sm')]: {
      padding: ['8px'],
    },
  },
  toggleButton: {
    position: 'absolute',
    top: '8px',
    left: 0,
    transform: 'translateX(-50%)',
    zIndex: 2,
    padding: 0,
    border: '1px solid gray',
    backgroundColor: '#FFF',

    '&:hover': {
      backgroundColor: '#F8F9FD',
    },

    transition: theme.transitions.create(
      'transform',
      theme.transitions.duration.standard,
      theme.transitions.easing.easeIn,
    ),
  },
  toggleClosed: {
    transform: 'translateX(-50%) rotate(180deg)',
  },
  contentInner: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      overflow: 'hidden',
    },
  },
  center: {
    justifyContent: 'center',
  },
  sidebarPad: {
    padding: '4px',
  },
  footer: {
    height: theme.appBarHeight,
    borderTop: '1px solid gray',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: ['4px', '8px'],

    '& > *:not(:last-child)': {
      marginLeft: '4px',
    },
  },
}))

function SidebarLayout(props) {
  const {
    sidebarWidth,
    sidebar,
    contentPad,
    sidebarPad,
    center,
    children,
    footer,
    disableCollapse,
  } = props

  const [open, setOpen] = React.useState(true)
  // const theme = useTheme()
  const toggle = () => setOpen(!open)
  const hasFooter = Boolean(footer)

  const classes = useStyles(props)

  return (
    <div className={cx(classes.root, { [classes.hasFooter]: hasFooter })}>
      <Hidden smDown>
        <div
          className={classes.sidebar}
          style={{
            width: open ? sidebarWidth : '8px',
            // borderRightWidth: open ? 1 : 0,
          }}
        >
          <div
            className={cx(classes.sidebarInner, {
              [classes.sidebarPad]: sidebarPad,
            })}
            style={{ width: sidebarWidth, opacity: open ? 1 : 0 }}
          >
            {sidebar}
          </div>
        </div>
      </Hidden>
      <div
        className={cx(classes.content, {
          [classes.center]: center,
        })}
      >
        {!disableCollapse && (
          <IconButton
            className={cx(classes.toggleButton, {
              [classes.toggleClosed]: !open,
            })}
            color={'primary'}
            onClick={toggle}
          >
            <ArrowIcon />
          </IconButton>
        )}
        <div
          className={cx(classes.contentInner, {
            [classes.contentPad]: contentPad,
          })}
        >
          {children}
        </div>
        {hasFooter && <div className={classes.footer}>{footer}</div>}
      </div>
    </div>
  )
}

SidebarLayout.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  sidebarWidth: PropTypes.number,
  contentPad: PropTypes.bool,
  center: PropTypes.bool,
  sidebarPad: PropTypes.bool,
  footer: PropTypes.node,
  disableCollapse: PropTypes.bool,
}

SidebarLayout.defaultProps = {
  sidebarWidth: 280,
  disableCollapse: false,
}

export default SidebarLayout
