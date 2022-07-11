import './style/App.css';
import Router from './Router'

// context
import { ARContextProvider } from './context/ARContext';
import { ModuleContextProvider } from './context/ModuleContext';
import { ArticleContextProvider } from './context/ArticleContext';
import { OutputWaveContextProvider } from './context/OutputWaveContext';
import { PreviewObjectProvider } from './context/PreviewObject';
import { OutputResponseProvider } from './context/OutputResponseContext';

function App() {
    return (
        <ARContextProvider>
            <PreviewObjectProvider>
                <OutputWaveContextProvider>
                    <OutputResponseProvider>
                        <ModuleContextProvider>
                            <ArticleContextProvider>
                                <Router />
                            </ArticleContextProvider>
                        </ModuleContextProvider>
                    </OutputResponseProvider>
                </OutputWaveContextProvider>
            </PreviewObjectProvider>
        </ARContextProvider>
    );  
}

export default App;
