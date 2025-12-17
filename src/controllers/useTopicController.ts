import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CppFeature, Exercise, CodeReview } from '../types';
import { exercises } from '../data/exercises';
import { cppFeatures } from '../data/features';
import { validateCode, generateAIReview } from '../services/ExerciseService';

export const useTopicController = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const [topic, setTopic] = useState<CppFeature | null>(null);

    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [userCode, setUserCode] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string>('');
    const [showHints, setShowHints] = useState(false);
    const [aiReview, setAiReview] = useState<CodeReview | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        if (topicId) {
            const foundTopic = cppFeatures.find(f => f.id === topicId);
            if (foundTopic) {
                setTopic(foundTopic);
            } else {
                // Handle topic not found
                console.error('Topic not found');
                navigate('/');
            }
        }
    }, [topicId, navigate]);

    const relatedExercises = topic ? exercises.filter(ex => ex.relatedTheory === topic.id) : [];

    const selectExercise = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        if (exercise) {
            setUserCode(exercise.starterCode);
        }
        setOutput('');
        setShowHints(false);
        setAiReview(null);
    };

    const runCode = async () => {
        if (!userCode.trim()) return;

        setIsRunning(true);
        setOutput('');
        setAiReview(null);

        try {
            // Simulate code execution
            await new Promise(resolve => setTimeout(resolve, 2000));

            let executionOutput = '';
            let success = false;

            if (selectedExercise) {
                if (userCode.includes('TODO')) {
                    executionOutput = 'Error: Please complete the TODO sections before running.\n\nCompilation failed.';
                } else {
                    // Simple validation - check if code contains expected patterns
                    const hasExpectedPatterns = validateCode(userCode, selectedExercise);
                    if (hasExpectedPatterns) {
                        executionOutput = `Compilation successful!\n\nOutput:\n${selectedExercise.expectedOutput}\n\n✓ Test passed!`;
                        success = true;
                    } else {
                        executionOutput = `Compilation successful!\n\nOutput:\nUnexpected output - please check your implementation.\n\n⚠ Test failed - output doesn't match expected result.`;
                    }
                }
            }

            setOutput(executionOutput);

            // If compilation was successful, automatically trigger AI review
            if (success) {
                setIsAnalyzing(true);

                // Simulate AI analysis
                await new Promise(resolve => setTimeout(resolve, 2500));

                // Generate AI review based on the exercise and code
                const review = generateAIReview(userCode, selectedExercise);
                setAiReview(review);
                setIsAnalyzing(false);
            }

        } catch (error) {
            setOutput('Error: Failed to execute code. Please check your implementation.\n\nRuntime error.');
        } finally {
            setIsRunning(false);
        }
    };

    return {
        topic,
        relatedExercises,
        selectedExercise,
        userCode,
        setUserCode,
        isRunning,
        output,
        showHints,
        setShowHints,
        aiReview,
        isAnalyzing,
        selectExercise,
        runCode
    };
};
