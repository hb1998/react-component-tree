import React, { useContext, useEffect, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import PubSub from 'pubsub-js';
import { ACTIONS } from '../../actions';
import { useKeyBindings } from '../../hooks/useKeyBindings';
import { DispatchContext, renderProvider, StateContext } from '../../pages/sidebar';
import Navigation from '../../service/Navigation';
import { INode } from '../../../types';
import Node from './Node/Node';
import { PubSubEvents } from '../../constants/PubSubEvents';

interface IProps {
}
const Tree: React.FC<IProps> = () => {

    const header = 85;
    const height = document.body.clientHeight - header;
    const width = document.body.clientWidth - 10;

    const { rows, focusedNode } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const listRef: React.LegacyRef<FixedSizeList<INode[]>> = useRef(null);

    useEffect(() => {
        // Event Listener for 'message' from the extension
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === "onActiveTextEditor") {
                const node = renderProvider.filePathMap.get(message.value);
                if (node) {
                    scrollToNode(node);
                    dispatch({
                        type: ACTIONS.UPDATE_ACTIVE_NODE,
                        payload: node.id
                    });
                }
            }
        });
        const subscription = PubSub.subscribe(PubSubEvents.SCROLL_TO_NODE, (_, nodeId) => {
            const node = renderProvider.rowMap.get(nodeId);
            if (node) {
                scrollToNode(node);
            }
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    const scrollToNode = (node: INode) => {
        if (node) {
            listRef.current?.scrollToItem(node.index, "smart");
        }
    };

    useKeyBindings((keyCode) => {
        const node = focusedNode ? renderProvider.rowMap.get(focusedNode as string) : null;
        if (node) {
            navigateHandler(keyCode, node);
        }
    },
        ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter'], focusedNode);


    return (<FixedSizeList
        ref={listRef}
        height={height}
        itemCount={rows.length}
        itemSize={30}
        width={width}
        itemData={rows}
        className="tree"
    >
        {Node}
    </FixedSizeList>);
};



const findNodeId = (filePath: string, nodes: any[]) => {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {

        const node = nodes[nodeIndex];
        if (node?.filePath === filePath) {
            return node?.id;
        } else {
            if (node?.children?.length) {
                const id = findNodeId(filePath, node.children);
                if (id) {
                    return id;
                }
            }

        }

    }
};

const navigateHandler = (keyCode, node: INode) => {
    switch (keyCode) {
        case 'ArrowRight': {
            if (!node.expanded) {
                renderProvider.toggleNode(node);
            }
            break;
        }
        case 'ArrowLeft': {
            if (node.expanded) {
                renderProvider.toggleNode(node);
            }
            break;
        }
        case 'ArrowUp': {
            Navigation.moveUp(node);
            break;
        }
        case 'ArrowDown': {
            Navigation.moveDown(node);
            break;
        }
        case 'Enter': {
            renderProvider.visitNode(node);
            break;
        }
        default: {
            break;
        }
    }
};

export default Tree;
