import React, { useState } from 'react'
import Content from '../../components/Content/Content'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../components/Tabs/Tabs';
import StudentInfo from './StudentInfo';
import OtherInfo from './OtherInfo';

const AddStudentView = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Content
            titleName='Öğrenciler'
            header='Öğrenci Tanımlama'
            content={
                <>
                    <AntTabs value={value} onChange={handleChange}>
                        <AntTab label="Öğrenci Bilgileri" {...a11yProps(0)} />
                        <AntTab label="Ebeveyn Bilgileri" {...a11yProps(1)} />
                        <AntTab label="Diğer Bilgiler" {...a11yProps(2)} />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <StudentInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        asd
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <OtherInfo/>
                    </TabPanel>
                </>
            }

        />
    )
}

export default AddStudentView