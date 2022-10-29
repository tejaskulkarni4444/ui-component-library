import React, { useState } from 'react'
import { MdAdd, MdMinimize } from 'react-icons/md';
import { Container } from '@mui/system';
import styled from 'styled-components';
import { ICloseCallback, IReturnValueCallback } from '../ListTable';
import { Button } from '@mui/material';

////////////////////////
//      Styles        //
///////////////////////


//
// Styled list item
//
const StyledListItem = styled.li`
    list-style: none;
	cursor: pointer;
	margin: 10px 0;
`;

const StyledListChildItem = styled.li`
    list-style: none;
	cursor: pointer;
	margin: 10px 0;
`;

const StyledListContainer = styled.ul`
    height: 350px;
	overflow: auto;
`;

const StyledCheckbox = styled.input`
    margin-right: 10px
`;

interface TreeViewListProps {
	listData: Array<{}>,
	returnSelectedOptions: IReturnValueCallback;
	multipleSelection: boolean;
	handleClose: ICloseCallback;
}

export default function TreeViewList({
	returnSelectedOptions,
	listData
}: TreeViewListProps) {
	//////////////////
	//    states    //
	//////////////////

	const [expansionList, setExpansionList] = useState<Array<string>>([])
	const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

	///////////////////////////
	//        handlers       //
	///////////////////////////

	//
	// handle options exapnsion
	//
	const handleExpand = (id: string) => {
		let currentList = expansionList;

		currentList.push(id)
		setExpansionList([...currentList])
	}

	//
	// handle options minization
	//
	const handleMinimize = (id: string) => {
		let currentList = expansionList;

		currentList = currentList.filter(item => item !== id)
		setExpansionList([...currentList])
	}

	//
	// Checkbox seleciton and unselection
	//
	const handleCheckBox = (selectedItem: any) => {
		const isSelected = selectedOptions.filter((selOption: any) => selOption.id === selectedItem.id).length === 1 ? true : false
		let tempList = selectedOptions;

		if (isSelected) {
			tempList = tempList.filter((item: any) => item.id !== selectedItem.id)
			setSelectedOptions([...tempList])
		} else {
			tempList.push(selectedItem)
		}
		setSelectedOptions([...tempList])
	}

	//
	// handle submission
	//
	const handleSubmit = () => {
		returnSelectedOptions(selectedOptions)
	}

	return (
		<Container sx={{ maxWidth: '500px' }}>
			<>
				<StyledListContainer>
					{listData && listData.length > 0 && listData.map((item: any) => {
						return <StyledListItem key={item.id}>
							{item.children && item.children.length > 0 ? <>
								{expansionList.includes(item.id) ? <MdMinimize
									fontSize={14}
									style={{
										marginBottom: '4px'
									}}
									onClick={() => handleMinimize(item.id)}
								/>
									: <MdAdd
										fontSize={14}
										onClick={() => handleExpand(item.id)}
									/>
								}
							</> :
								<div style={{ width: '15px' }}></div>
							}
							{item.children && item.children.length > 0 ? <label
								style={{
									cursor: 'pointer'
								}}
								onClick={() => expansionList.includes(item.id) ? handleMinimize(item.id) : handleExpand(item.id)}
							>
								{item.name}
							</label> : <label
								onClick={() => expansionList.includes(item.id) ? handleMinimize(item.id) : handleExpand(item.id)}
							>
								<StyledCheckbox
									type='checkbox'
									onChange={() => handleCheckBox(item)}
									checked={selectedOptions.filter((option: any) => option.id === item.id).length === 1 ? true : false}
								/>
								{item.name}
							</label>}
							{item.children && expansionList.includes(item.id) && (
								<ul style={{ paddingLeft: '15px' }}>
									{item.children?.map((childItem: any) => {
										return <StyledListChildItem key={childItem.id} onClick={() => handleCheckBox(childItem)}>
											<StyledCheckbox
												type='checkbox'
												onChange={() => handleCheckBox(childItem)}
												checked={selectedOptions.filter((option: any) => option.id === childItem.id).length === 1 ? true : false}
											/>
											{childItem.name}
										</StyledListChildItem>
									})}
								</ul>
							)}
						</StyledListItem>
					})}
				</StyledListContainer>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginTop: "15px",
					}}
				>
					<Button
						onClick={handleSubmit}
						variant="contained"
						sx={{
							fontWeight: 600,
						}}
					>
						Done
					</Button>
				</div>
			</>

		</Container>
	)
}
