import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import MenuLangPart from './MenuLangPart';
import MenuAnalPart from './MenuAnalPart';
import MenuTransPart from './MenuTransPart';

const styles = {
    menuBar: {
        backgroundColor: '#2e98d1',
    },
    menuIcon: {
        color: 'white',
    },
};

class AppMenuBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar
                title="JukaiNLP"
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={
                            <IconButton iconStyle={ styles.menuIcon }>
                                <NavigationMenu />
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                        <MenuLangPart />

                        <Divider />

                        <MenuAnalPart />

                        <Divider />

                        <MenuTransPart />
                    </IconMenu>
                }
                iconElementRight={
                    <IconButton
                        iconClassName="muidocs-icon-custom-github"
                        tooltip="GitHubリンク"
                        tooltipPosition="bottom-left"
                        href="https://github.com/hshindo/JukaiNLP.jl"
                        target="_blank"
                    />
                }
                style={ styles.menuBar }
            />
        );
    }
}

export default AppMenuBar;
