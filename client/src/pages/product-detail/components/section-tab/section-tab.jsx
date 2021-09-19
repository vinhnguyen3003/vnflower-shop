import React from 'react';
import SectionTabTitle from './section-tab-title';
import SectionTabContent from './section-tab-content';
import TabActiveContextProvider from './../../contexts/TabActiveContext';
//import PropTypes from 'prop-types';

SectionTab.propTypes = {};

function SectionTab(props) {
    return (
        <section className="section-tab">
            <div className="section-tab__wrapper">
                <TabActiveContextProvider>
                    <SectionTabTitle />
                    <SectionTabContent />
                </TabActiveContextProvider>
            </div>
        </section>
    );
}

export default SectionTab;