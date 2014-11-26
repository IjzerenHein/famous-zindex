/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define, Please, console*/
/*eslint no-console:0 no-use-before-define:0*/

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Surface = require('famous/core/Surface');
    var RenderNode = require('famous/core/RenderNode');
    var Transform = require('famous/core/Transform');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');

    var mainContext = Engine.createContext();

    function _createSurface(z) {
        return new Surface({
            content: 'z-translate: ' + z,
            properties: {
                background: 'rgb(' + (z + 127) + ', ' + (z + 127) + ', ' + (z + 127) + ')'
            }
        });
    }

    function _createModifier(z) {
        return new Modifier({
            size: [undefined, undefined],
            proportions: [(127 - z) / 256, (127 - z) / 256],
            transform: Transform.translate(0, 0, z),
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });
    }

    // Plain (left-top)
    var renderNode = new RenderNode(new Modifier({
        proportions: [0.5, 0.5],
        origin: [0.75, 0.75],
        align: [0.5, 0.5]
    }));
    mainContext.add(renderNode);
    renderNode.add(_createModifier(0)).add(_createSurface(0));
    renderNode.add(_createModifier(50)).add(_createSurface(50));
    renderNode.add(_createModifier(-50)).add(_createSurface(-50));
    mainContext.add(new Modifier({
        align: [0, 0],
        origin: [0, 0],
        size: [200, 30]
    })).add(new Surface({
        content: 'no container surface'
    }));

    // Inside container surface (right-top)
    renderNode = new RenderNode(new Modifier({
        proportions: [0.5, 0.5],
        origin: [0.25, 0.75],
        align: [0.5, 0.5]
    }));
    mainContext.add(renderNode);
    var containerSurface = new ContainerSurface();
    renderNode.add(containerSurface);
    renderNode = containerSurface;
    renderNode.add(_createModifier(0)).add(_createSurface(0));
    renderNode.add(_createModifier(50)).add(_createSurface(50));
    renderNode.add(_createModifier(-50)).add(_createSurface(-50));
    mainContext.add(new Modifier({
        align: [1, 0],
        origin: [1, 0],
        size: [200, 30]
    })).add(new Surface({
        content: '1 container surface',
        properties: {
            textAlign: 'right'
        }
    }));

    // Container surface with overflow:hidden (left-bottom)
    renderNode = new RenderNode(new Modifier({
        proportions: [0.5, 0.5],
        origin: [0.75, 0.25],
        align: [0.5, 0.5]
    }));
    mainContext.add(renderNode);
    containerSurface = new ContainerSurface({
        properties: {
            overflow: 'hidden'
        }
    });
    renderNode.add(containerSurface);
    renderNode = containerSurface;
    renderNode.add(_createModifier(0)).add(_createSurface(0));
    renderNode.add(_createModifier(50)).add(_createSurface(50));
    renderNode.add(_createModifier(-50)).add(_createSurface(-50));
    mainContext.add(new Modifier({
        align: [0, 1],
        origin: [0, 1],
        size: [200, 60]
    })).add(new Surface({
        content: 'container surface<br>with overflow: hidden'
    }));

    // Inside three container surfaces (right-bottom)
    renderNode = new RenderNode(new Modifier({
        proportions: [0.5, 0.5],
        origin: [0.25, 0.25],
        align: [0.5, 0.5]
    }));
    mainContext.add(renderNode);
    containerSurface = new ContainerSurface();
    renderNode.add(containerSurface);
    renderNode = containerSurface;
    containerSurface = new ContainerSurface();
    renderNode.add(containerSurface);
    renderNode = containerSurface;
    containerSurface = new ContainerSurface();
    renderNode.add(containerSurface);
    renderNode = containerSurface;
    renderNode.add(_createModifier(0)).add(_createSurface(0));
    renderNode.add(_createModifier(50)).add(_createSurface(50));
    renderNode.add(_createModifier(-50)).add(_createSurface(-50));
    mainContext.add(new Modifier({
        align: [1, 1],
        origin: [1, 1],
        size: [200, 30]
    })).add(new Surface({
        content: '2 container surfaces',
        properties: {
            textAlign: 'right'
        }
    }));
});
